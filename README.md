# Piyango API

File-based proxy server for Turkey's national lottery games.

## Types

The following is a list of the types of data used within the Piyango API:

| Name    | Definition                                                   | Example      |
| ------- | ------------------------------------------------------------ | ------------ |
| ID      | A unique value used to identify resources (mostly games).    | `q1w2e3r4t5` |
| String  | A string is a sequence of characters used to represent text. | `"JACKPOT"`  |
| Integer | An integer is a number without decimals.                     | `12345`      |
| Enum    | An Enum is a String with only a few possible valid values.   | `"X" | "Y"`  |
| Date    | A date string in the form of YYYYMMDD.                       | `20200311`   |

## Endpoints

- ### Root

  `GET https://piyango.now.sh/v1/`

- ### Draw Dates

  Get draw dates for given game.

  `GET https://piyango.now.sh/v1/drawdates/:gameId`

  - #### URL Parameters

    | Key    | Type | Required | Description                                                                                                                      |
    | ------ | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | gameId | Enum | Yes      | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |

    #### Example Request

    https://piyango.now.sh/v1/drawdates/sayisal

    #### Query parameters

    The following query parameters are allowed:

    | Query param | Type    | Required | Default value                       | Description                                                                                                      |
    | ----------- | ------- | -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
    | `limit`     | Integer | No       | `104` (~2 years worth of draw data) | Limit the number of results returned. Provide `0` for unlimited results.                                         |
    | `skip`      | String  | No       | `0`                                 | Use it in conjunction with `limit` to **paginate results**.                                                      |
    | `sort`      | Enum    | No       | `desc`                              | Specifies the sorting order in which the results will be returned. Should be one of these two: `"asc" | "desc"`. |

    #### Example Request

    The following request returns the results for draws 11 through 20 for the game `sayisal`.

    https://piyango.now.sh/v1/drawdates/sayisal?limit=10&skip=10&sort=asc

- ### Draws

  Get the information for a specific draw by passing both `gameId` and `drawDate` strings.

  `GET https://piyango.now.sh/v1/draws/:gameId/:drawDate`

  - #### URL Parameters

    | Key      | Type | Required | Description                                                                                                                      |
    | -------- | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | gameId   | Enum | Yes      | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |
    | drawDate | Date | Yes      | The date of the draw in `YYYYMMDD` format.                                                                                       |

    #### Example Request

    https://piyango.now.sh/v1/draws/sayisal/20200311

- ### Luck History

  Get the luck history of the date. If no parameters are provided, it returns the dates of all possible draws for all games that match the current day and month. Providing `date` and `gameId` further filters the results.

  `GET https://piyango.now.sh/v1/luckhistory/?:date/?:gameId`

  - #### URL Parameters

    | Key    | Type | Required | Description                                                                                                                      |
    | ------ | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | date   | Date | No       | The date string in `YYYYMMDD` format.                                                                                            |
    | gameId | Enum | No       | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |

    #### Example Request

    https://piyango.now.sh/v1/luckhistory/20200310

* ### Server Time

  Get the time of the server as a [moment object](https://momentjs.com/docs/#/displaying/as-object/).

  `GET https://piyango.now.sh/v1/time`

  #### Example Request

  https://piyango.now.sh/v1/time
