"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var newLocal = new NoFeatureServiceProvidedRootWalker(sourceFile, 'no-feature-service-provided-root', this.getOptions());
        return this.applyWithWalker(newLocal);
    };
    Rule.FAILURE_STRING = 'providedIn:\'root\' statement forbidden for feature service';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoFeatureServiceProvidedRootWalker = /** @class */ (function (_super) {
    __extends(NoFeatureServiceProvidedRootWalker, _super);
    function NoFeatureServiceProvidedRootWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoFeatureServiceProvidedRootWalker.prototype.walk = function (sourceFile) {
        if (!(sourceFile.fileName.indexOf('.spec') >= 0
            || sourceFile.fileName.indexOf('e2e') >= 0)
            && sourceFile.fileName.indexOf('feature') >= 0) {
            var nodes = sourceFile.getChildren().find(function (element) { return element.kind === ts.SyntaxKind.SyntaxList; });
            var classDeclaration = nodes.getChildren().find(function (element) { return element.kind === ts.SyntaxKind.ClassDeclaration; });
            var injectProvidedNode = this.hasInjectableDecorator(classDeclaration);
            if (injectProvidedNode && injectProvidedNode !== undefined) {
                this.addFailureAtNode(injectProvidedNode, Rule.FAILURE_STRING);
            }
        }
    };
    NoFeatureServiceProvidedRootWalker.prototype.hasInjectableDecorator = function (node) {
        var _this = this;
        return node !== undefined && node.decorators !== undefined
            && node.decorators.find(function (s) { return _this.isInjectableDecorator(s.expression) && _this.hasProvidedInRoot(s.expression); });
    };
    NoFeatureServiceProvidedRootWalker.prototype.isInjectableDecorator = function (decorator) {
        return decorator.getChildren().some(function (element) { return element.kind === ts.SyntaxKind.Identifier
            && element.getText() === 'Injectable'; });
    };
    NoFeatureServiceProvidedRootWalker.prototype.hasProvidedInRoot = function (node) {
        var _this = this;
        return node.getChildren().some(function (element) { return element.kind === ts.SyntaxKind.SyntaxList && _this.localizeObjectExpresion(element); });
    };
    NoFeatureServiceProvidedRootWalker.prototype.localizeObjectExpresion = function (node) {
        var _this = this;
        return node.getChildren().some(function (element) { return element.kind === ts.SyntaxKind.ObjectLiteralExpression
            && _this.localizeExpresionSyntaxis(element); });
    };
    NoFeatureServiceProvidedRootWalker.prototype.localizeExpresionSyntaxis = function (node) {
        var _this = this;
        return node.getChildren().some(function (element) { return element.kind === ts.SyntaxKind.SyntaxList && _this.localizeProvideInRoot(element); });
    };
    NoFeatureServiceProvidedRootWalker.prototype.localizeProvideInRoot = function (node) {
        return node.getChildren().find(function (element) { return ts.isPropertyAssignment(element)
            && element.name.getText() === 'providedIn'
            && element.initializer.getText() === '\'root\''; });
    };
    return NoFeatureServiceProvidedRootWalker;
}(Lint.AbstractWalker));
