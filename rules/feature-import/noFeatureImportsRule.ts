import * as Lint from 'tslint';
import * as ts from 'typescript';
import * as fs from 'fs';
import { isImportDeclaration } from 'tsutils';
import { element } from 'protractor';


export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'import statement forbidden';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const newLocal = new ImportWalker(sourceFile, 'no-feature-imports', this.getOptions());
    return this.applyWithWalker(newLocal);
  }
}

class ImportWalker extends Lint.AbstractWalker<any> {
  private imports = [];
  private features = [];
  private fileName: string;
  private readonly FEATURE_ROUTE = './src/app/feature';
  private readonly FEATURE_CONSTANT = 'feature';
  private readonly CORE_CONSTANT = 'core';
  private readonly SHARED_CONSTANT = 'shared';

  public walk(sourceFile: ts.SourceFile) {
    this.features = this.getFiles(this.FEATURE_ROUTE);
    if (!(sourceFile.fileName.indexOf('.spec') >= 0
      || sourceFile.fileName.indexOf('e2e') >= 0)) {
      this.fileName = sourceFile.fileName;
      const nodes = sourceFile.getChildren().find(child => child.kind === ts.SyntaxKind.SyntaxList);
      this.imports = nodes.getChildren().filter(child => child.kind === ts.SyntaxKind.ImportDeclaration);

      if (sourceFile.fileName.indexOf(this.FEATURE_CONSTANT) >= 0) {
        this.checkImportsBetweenFeatures();
      } else if (sourceFile.fileName.indexOf(this.CORE_CONSTANT) >= 0
        || sourceFile.fileName.indexOf(this.SHARED_CONSTANT) >= 0) {
        this.checkImportFromFeatures();
      }


    }
  }
  private checkImportFromFeatures() {
    this.imports.forEach((importStatement: ts.ImportDeclaration, _: number) => {
      const importPath = this.getImportPathText(importStatement);
      if (importPath.indexOf(this.convertFeatureRoute(this.FEATURE_CONSTANT)) >= 0) {
        this.addFailureAtNode(importStatement, Rule.FAILURE_STRING);
      } else {
        this.features.forEach((feature: string) => {
          if (this.validateFeatureImport(importPath, feature)) {
            this.addFailureAtNode(importStatement, Rule.FAILURE_STRING);
          }
        });
      }
    });
  }

  private checkImportsBetweenFeatures() {
    this.imports.forEach((importStatement: ts.ImportDeclaration, _: number) => {
      const importPath = this.getImportPathText(importStatement);
      this.features.forEach((feature: string) => {
        if (this.validateFeatureImport(importPath, feature)
          && this.validateIsNotSameFeature(feature)) {
          this.addFailureAtNode(importStatement, Rule.FAILURE_STRING);
        }
      });
    });
  }

  private validateFeatureImport(importPath: string, feature: string) {
    return (this.validateImportBeautyPath(importPath, feature)
      || this.validateImportRoute(importPath, feature));
  }

  private validateIsNotSameFeature(feature: string) {
    const featureSr = this.convertFeatureRoute(feature);
    return this.fileName.indexOf(featureSr) === -1;
  }

  private getFiles(dir) {
    return fs.readdirSync(dir);
  }

  private getImportPathText(importStatement: ts.ImportDeclaration): string {
    return importStatement && importStatement.moduleSpecifier.getText().replace(/'/g, '');
  }



  private convertFeatureRoute(feature: string) {
    return '/'.concat(feature).concat('/');
  }

  private validateImportRoute(importPath: string, feature: string): boolean {
    const featureSr = this.convertFeatureRoute(feature);
    return importPath.indexOf(featureSr) >= 0;
  }

  private validateImportBeautyPath(importPath: string, feature: string) {
    return importPath.indexOf('@'.concat(feature)) === 0;
  }
}
