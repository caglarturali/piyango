# Piyango API

File-based proxy server for Turkey's national lottery games.

## Definitions and variables

`gameId`: The generic term used throughout the document to refer to one of the following constants:

- `sayisal`
- `sanstopu`
- `onnumara`
- `superloto`
- `piyango`

## Endpoints

- ### Root endpoint.

  `https://piyango-api.now.sh/api`

- ### Draw dates endpoint.

  `https://piyango-api.now.sh/api/drawdates`

  - #### Usage:

    `https://piyango-api.now.sh/api/drawdates/[gameId]`

    e.g. https://piyango-api.now.sh/api/drawdates/sayisal

  - #### Query parameters:

    The following query parameters are allowed:

    - `limit`: Defaults to `104`. Supply `0` for unlimited results.
    - `order`: Defaults to `desc`. Should be one of these two: `asc` | `desc`.

      `https://piyango-api.now.sh/api/drawdates/[gameId]?limit=10&order=asc`

      e.g. https://piyango-api.now.sh/api/drawdates/sayisal?limit=10&order=asc
