import * as Lint from 'tslint';
import * as ts from 'typescript';


export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'providedIn:\'root\' statement forbidden for feature service';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const newLocal = new NoFeatureServiceProvidedRootWalker(sourceFile, 'no-feature-service-provided-root', this.getOptions());
    return this.applyWithWalker(newLocal);
  }
}

class NoFeatureServiceProvidedRootWalker extends Lint.AbstractWalker<any> {

  walk(sourceFile: ts.SourceFile): void {

    if (!(sourceFile.fileName.indexOf('.spec') >= 0
      || sourceFile.fileName.indexOf('e2e') >= 0)
      && sourceFile.fileName.indexOf('feature') >= 0) {
      const nodes = sourceFile.getChildren().find(element => element.kind === ts.SyntaxKind.SyntaxList);
      const classDeclaration = nodes.getChildren().find(element => element.kind === ts.SyntaxKind.ClassDeclaration);
      const injectProvidedNode = this.hasInjectableDecorator(classDeclaration as ts.ClassDeclaration);
      if (injectProvidedNode && injectProvidedNode !== undefined) {
        this.addFailureAtNode(injectProvidedNode, Rule.FAILURE_STRING);
      }

    }
  }
  private hasInjectableDecorator(node: ts.ClassDeclaration) {
    return node !== undefined && node.decorators !== undefined
      && node.decorators.find(s => this.isInjectableDecorator(s.expression) && this.hasProvidedInRoot(s.expression));
  }

  private isInjectableDecorator(decorator: ts.Node) {
    return decorator.getChildren().some(element => element.kind === ts.SyntaxKind.Identifier
      && element.getText() === 'Injectable');
  }

  private hasProvidedInRoot(node: ts.Node) {
    return node.getChildren().some(element => element.kind === ts.SyntaxKind.SyntaxList && this.localizeObjectExpresion(element));
  }

  private localizeObjectExpresion(node: ts.Node) {
    return node.getChildren().some(element => element.kind === ts.SyntaxKind.ObjectLiteralExpression
      && this.localizeExpresionSyntaxis(element));
  }

  private localizeExpresionSyntaxis(node: ts.Node) {
    return node.getChildren().some(element => element.kind === ts.SyntaxKind.SyntaxList && this.localizeProvideInRoot(element));
  }
  private localizeProvideInRoot(node: ts.Node) {
    return node.getChildren().find(element => ts.isPropertyAssignment(element)
      && (element as ts.PropertyAssignment).name.getText() === 'providedIn'
      && (element as ts.PropertyAssignment).initializer.getText() === '\'root\'');
  }

}
