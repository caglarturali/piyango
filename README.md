# Piyango API

File-based proxy server for Turkey's national lottery games.

## Definitions and variables

`gameId`: The generic term used throughout the document to refer to one of the following constants:

- `sayisal`
- `sanstopu`
- `onnumara`
- `superloto`
- `piyango`

`N`: Indicates that an integer value should be supplied.

`(x | y)`: Indicates that either of the values should be supplied.

`YYYYMMDD`: The date format that the API expects.

## Endpoints

- ### Root endpoint.

  `https://piyango.now.sh/api`

- ### Draw dates endpoint.

  Lists the draw dates for given game.

  `https://piyango.now.sh/api/drawdates`

  - #### Usage:

    `https://piyango.now.sh/api/drawdates/[gameId]`

    e.g. https://piyango.now.sh/api/drawdates/sayisal

  - #### Query parameters:

    The following query parameters are allowed:

    | Query param | Required | Default value                       | Description                                                                                            |
    | ----------- | -------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
    | `limit`     | No       | `104` (~2 years worth of draw data) | Provide `0` for unlimited results.                                                                     |
    | `skip`      | No       | `0`                                 | Use it in conjunction with `limit` to **paginate results**.                                            |
    | `order`     | No       | `desc`                              | Specifies the order in which the results will be returned. Should be one of these two: `asc` - `desc`. |

    `https://piyango.now.sh/api/drawdates/[gameId]?limit=[N]&skip=[N]&order=(asc|desc)`

    e.g. https://piyango.now.sh/api/drawdates/sayisal?limit=10&skip=10&order=asc returns the results for draws 11 through 20.

- ### Draws endpoint.

  Returns the draw result for given game and the date.

  `https://piyango.now.sh/api/draws/[gameId]?date=[YYYYMMDD]`

  - #### Query parameters:

    The following query parameters are allowed:

    | Query param | Required | Default value | Description                                        |
    | ----------- | -------- | ------------- | -------------------------------------------------- |
    | `date`      | Yes      | -             | Provide the date of the draw in `YYYYMMDD` format. |

    e.g. https://piyango.now.sh/api/draws/sayisal?date=20200311
