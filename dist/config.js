'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var root = exports.root = 'https://raw.githubusercontent.com';
var repo = exports.repo = 'react-community/native-directory';
var directory = exports.directory = `${root}/${repo}/master/react-native-libraries.json`;
var githubUrlFor = exports.githubUrlFor = function githubUrlFor(repo) {
  return `https://github.com/${repo}`;
};
var packageFor = exports.packageFor = function packageFor(repo) {
  return `${root}/${repo}/master/package.json`;
};