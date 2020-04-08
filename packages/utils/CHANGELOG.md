# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.2] - 2020-04-08

### Changed

- Sort numbers before processing in TicketUtils.

## [1.4.1] - 2020-04-08

### Fixed

- The `onnumara` case of the switch statement.

## [1.4.0] - 2020-04-07

### Changed

- The return type of the TicketUtils.compareTicketAgainstDraw

## [1.3.0] - 2020-04-07

### Added

- RegularCheck.checkMatch static method
- TicketUtils.compareTicketAgainstDraw static method
- TicketUtils.arrayToObjectMap static method
- TicketUtils.objectToArrayMap static method

## [1.2.0] - 2020-04-07

### Removed

- DrawUtils.convertColumnsToTickets

### Added

- TicketUtils

## [1.1.0] - 2020-04-06

### Added

- DrawUtils.convertColumnsToTickets method added

## [1.0.0] - 2020-04-06

### Changed

- Include Check, ProcessDraw and Random classes to eliminate circular deps

## [0.3.0] - 2020-04-06

### Changed

- Refactor DrawUtils.matchTypeToString into matchTypeToText which returns MatchText object now.

## [0.1.0] - 2020-04-06

### Added

- Initial release
