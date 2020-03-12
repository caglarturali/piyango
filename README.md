# Piyango API

File-based proxy server for Turkey's national lottery games.

## Definitions and variables

`gameId`: The generic term used throughout the document to refer to one of the following constants:

- `sayisal`
- `sanstopu`
- `onnumara`
- `superloto`
- `piyango`

`N`: Indicates that a numerical value should be supplied.

`(x | y)`: Indicates that either of the values should be supplied.

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

    - `limit`: Defaults to `104` (approximately 2 years worth of draw data). Provide `0` for unlimited results.
    - `skip`: Defaults to `0`. Use it in conjunction with `limit` to **paginate results**.
    - `order`: Defaults to `desc`. Should be one of these two: `asc` | `desc`.

      `https://piyango-api.now.sh/api/drawdates/[gameId]?limit=[N]&skip=[N]&order=(asc|desc)`

      e.g. https://piyango-api.now.sh/api/drawdates/sayisal?limit=10&skip=10&order=asc returns the results for draws 11 through 20.
