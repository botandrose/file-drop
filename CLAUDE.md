# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a vanilla JavaScript custom element library that provides drag-and-drop file handling functionality. The project is framework-agnostic and published as `@botandrose/file-drop` on npm.

## Key Commands

**Testing:**
- `npm test` - Run all tests with Web Test Runner
- `npm run test:watch` - Run tests in watch mode
- `npm run test:chrome` - Run tests in Chrome/Chromium only
- `npm run test:firefox` - Run tests in Firefox (with concurrency 1)
- `npm run test:webkit` - Run tests in WebKit/Safari
- `npm run test:all` - Run tests across all browsers (Chrome, Firefox, WebKit)
- `npm run test:coverage` - Run tests with coverage (same as test:chrome)
- `npm run test:ci` - Run all browser tests with --fail-only flag

**Important:** The `--fail-only` flag (used in CI) will abort if any test files contain `it.only` calls.

## Architecture

**Core Structure:**
- `src/file-drop.js` - Main FileDrop custom element class
- `test/file-drop.test.js` - Comprehensive test suite using Chai assertions
- `test/lib/fail-only.mjs` - Web Test Runner plugin that prevents `it.only` in CI
- `web-test-runner.config.mjs` - Test runner configuration with coverage

**FileDrop Custom Element:**
- Extends HTMLElement with observed attribute `for`
- Connects to target `<input type="file">` element via `for` attribute
- Handles dragover, dragleave, and drop events
- Automatically applies default CSS styles (can be disabled with `data-no-default-styles`)
- Auto-registers as `<file-drop>` custom element on import
- Triggers `change` events on target input when files are dropped

**Testing Setup:**
- Uses Web Test Runner with Playwright for cross-browser testing
- Tests cover initialization, drag/drop behavior, styling, and cleanup
- Coverage reporting enabled for `src/` directory
- Mock files created using File constructor for drop event testing

## Development Notes

- The component uses ES modules (`"type": "module"` in package.json)
- Default styles are injected via JavaScript into document head
- Visual feedback provided through `-dragover` CSS class
- Files are transferred by setting `input.files = event.dataTransfer.files`
- Test timeout set to 10 seconds to accommodate browser operations