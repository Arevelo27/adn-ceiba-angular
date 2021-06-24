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
var fs = require("fs");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var newLocal = new ImportWalker(sourceFile, 'no-feature-imports', this.getOptions());
        return this.applyWithWalker(newLocal);
    };
    Rule.FAILURE_STRING = 'import statement forbidden';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ImportWalker = /** @class */ (function (_super) {
    __extends(ImportWalker, _super);
    function ImportWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.imports = [];
        _this.features = [];
        _this.FEATURE_ROUTE = './src/app/feature';
        _this.FEATURE_CONSTANT = 'feature';
        _this.CORE_CONSTANT = 'core';
        _this.SHARED_CONSTANT = 'shared';
        return _this;
    }
    ImportWalker.prototype.walk = function (sourceFile) {
        this.features = this.getFiles(this.FEATURE_ROUTE);
        if (!(sourceFile.fileName.indexOf('.spec') >= 0
            || sourceFile.fileName.indexOf('e2e') >= 0)) {
            this.fileName = sourceFile.fileName;
            var nodes = sourceFile.getChildren().find(function (child) { return child.kind === ts.SyntaxKind.SyntaxList; });
            this.imports = nodes.getChildren().filter(function (child) { return child.kind === ts.SyntaxKind.ImportDeclaration; });
            if (sourceFile.fileName.indexOf(this.FEATURE_CONSTANT) >= 0) {
                this.checkImportsBetweenFeatures();
            }
            else if (sourceFile.fileName.indexOf(this.CORE_CONSTANT) >= 0
                || sourceFile.fileName.indexOf(this.SHARED_CONSTANT) >= 0) {
                this.checkImportFromFeatures();
            }
        }
    };
    ImportWalker.prototype.checkImportFromFeatures = function () {
        var _this = this;
        this.imports.forEach(function (importStatement, _) {
            var importPath = _this.getImportPathText(importStatement);
            if (importPath.indexOf(_this.convertFeatureRoute(_this.FEATURE_CONSTANT)) >= 0) {
                _this.addFailureAtNode(importStatement, Rule.FAILURE_STRING);
            }
            else {
                _this.features.forEach(function (feature) {
                    if (_this.validateFeatureImport(importPath, feature)) {
                        _this.addFailureAtNode(importStatement, Rule.FAILURE_STRING);
                    }
                });
            }
        });
    };
    ImportWalker.prototype.checkImportsBetweenFeatures = function () {
        var _this = this;
        this.imports.forEach(function (importStatement, _) {
            var importPath = _this.getImportPathText(importStatement);
            _this.features.forEach(function (feature) {
                if (_this.validateFeatureImport(importPath, feature)
                    && _this.validateIsNotSameFeature(feature)) {
                    _this.addFailureAtNode(importStatement, Rule.FAILURE_STRING);
                }
            });
        });
    };
    ImportWalker.prototype.validateFeatureImport = function (importPath, feature) {
        return (this.validateImportBeautyPath(importPath, feature)
            || this.validateImportRoute(importPath, feature));
    };
    ImportWalker.prototype.validateIsNotSameFeature = function (feature) {
        var featureSr = this.convertFeatureRoute(feature);
        return this.fileName.indexOf(featureSr) === -1;
    };
    ImportWalker.prototype.getFiles = function (dir) {
        return fs.readdirSync(dir);
    };
    ImportWalker.prototype.getImportPathText = function (importStatement) {
        return importStatement && importStatement.moduleSpecifier.getText().replace(/'/g, '');
    };
    ImportWalker.prototype.convertFeatureRoute = function (feature) {
        return '/'.concat(feature).concat('/');
    };
    ImportWalker.prototype.validateImportRoute = function (importPath, feature) {
        var featureSr = this.convertFeatureRoute(feature);
        return importPath.indexOf(featureSr) >= 0;
    };
    ImportWalker.prototype.validateImportBeautyPath = function (importPath, feature) {
        return importPath.indexOf('@'.concat(feature)) === 0;
    };
    return ImportWalker;
}(Lint.AbstractWalker));
