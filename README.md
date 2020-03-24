# <img src="https://piyango.online/images/icons/icon-192.png" alt="Logo" width="32" height="32" /> Piyango API

File-based proxy server for Turkey's national lottery games.

## Types

The following is a list of the types of data used within the Piyango API:

| Name    | Definition                                                   | Example      |
| ------- | ------------------------------------------------------------ | ------------ |
| ID      | A unique value used to identify resources.                   | `q1w2e3r4t5` |
| String  | A string is a sequence of characters used to represent text. | `"JACKPOT"`  |
| Integer | An integer is a number without decimals.                     | `12345`      |
| Enum    | An Enum is a String with only a few possible valid values.   | `"X" | "Y"`  |
| Date    | A date string in the form of YYYYMMDD.                       | `20200311`   |

## Endpoints

- ### Root

  `GET https://dev.piyango.online/api/`

- ### Games

  Get the list of games that the API currently supports.

  `GET https://dev.piyango.online/api/games`

  #### Example Request

  https://dev.piyango.online/api/games

- ### Draw Dates

  Get draw dates for given game.

  `GET https://dev.piyango.online/api/drawdates/:gameId`

  - #### URL Parameters

    | Key    | Type | Required | Description                                                                                                                      |
    | ------ | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | gameId | Enum | Yes      | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |

    #### Example Request

    https://dev.piyango.online/api/drawdates/sayisal

    #### Query parameters

    The following query parameters are allowed:

    | Query param | Type    | Required | Default value | Description                                                                                                    |
    | ----------- | ------- | -------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
    | `limit`     | Integer | No       | `25`          | Limit the number of results returned. Provide `0` for unlimited results.                                       |
    | `skip`      | Integer | No       | `0`           | Use it in conjunction with `limit` to **paginate results**.                                                    |
    | `sort`      | Enum    | No       | `desc`        | Specifies the sorting order in which the results will be returned. Should be one of these two: `asc` - `desc`. |

    #### Example Request

    The following request returns the results for draws 11 through 20 for the game `sayisal`.

    https://dev.piyango.online/api/drawdates/sayisal?limit=10&skip=10&sort=asc

- ### Draws

  Get the information for a specific draw. Returns the **latest draws for all games** if both `gameId` and `drawDate` is omitted, or returns the details of the **last draw** if only `drawDate` is omitted.
  It supports performing multiple queries simultaneously when draw dates are provided as a comma-separated (",") list, without any additional characters in between dates.

  `GET https://dev.piyango.online/api/draws/?:gameId/?:drawDate`

  - #### URL Parameters

    | Key      | Type | Required | Description                                                                                                                      |
    | -------- | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | gameId   | Enum | No       | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |
    | drawDate | Date | No       | The date of the draw in `YYYYMMDD` format.                                                                                       |

    #### Example Requests

    https://dev.piyango.online/api/draws

    https://dev.piyango.online/api/draws/superloto

    https://dev.piyango.online/api/draws/sayisal/20200311

    https://dev.piyango.online/api/draws/sayisal/20200311,20200314

- ### Draw History

  Get the draw history of the date. If no parameters are provided, it returns the dates of all possible draws for all games that match the current day and month. Providing `date` and `gameId` further filters the results.

  `GET https://dev.piyango.online/api/drawhistory/?:date/?:gameId`

  - #### URL Parameters

    | Key    | Type | Required | Description                                                                                                                      |
    | ------ | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | date   | Date | No       | The date string in `YYYYMMDD` format.                                                                                            |
    | gameId | Enum | No       | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |

    #### Example Request

    https://dev.piyango.online/api/drawhistory/20200310

- ### Check

  Check the numbers against a specific draw. You can use `#`, `-`, `+`, `_` and `,` as the delimiter. Note that in the case of Sans Topu, the **last number must be the bonus (+1) number**. Milli Piyango (National Lottery) ticket numbers must be provided as is, without a delimiter between numbers.

  `POST https://dev.piyango.online/api/check/:gameId/:drawDate`

  - #### URL Parameters

    | Key      | Type | Required | Description                                                                                                                      |
    | -------- | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | gameId   | Enum | Yes      | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |
    | drawDate | Date | Yes      | The date of the draw in `YYYYMMDD` format.                                                                                       |

  - #### Request Parameters

    | Key     | Type     | Required | Description                                                                                        |
    | ------- | -------- | -------- | -------------------------------------------------------------------------------------------------- |
    | numbers | String[] | Yes      | Array of 'stringified' numbers to be checked, each representing a ticket or a selection of numbers |

    #### Example Request

    ```bash
    curl -X POST "https://dev.piyango.online/api/check/superloto/20200312" \
      -H "Content-Type: application/json" \
      -d '{
        "numbers": [
          "05#20#24#25#32#34",
          "07#24#25#08#10#51"
        ]
      }'
    ```

- ### Statistics

  Get the statistics for given game. The game `piyango` is not supported on this endpoint.

  `GET https://dev.piyango.online/api/stats/:gameId`

  - #### URL Parameters

    | Key    | Type | Required | Description                                                                                                           |
    | ------ | ---- | -------- | --------------------------------------------------------------------------------------------------------------------- |
    | gameId | Enum | Yes      | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto` |

    #### Example Request

    https://dev.piyango.online/api/stats/sanstopu

    https://dev.piyango.online/api/stats/sayisal

- ### Random

  Generates [pseudo-random](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) guesses for given game. The game `piyango` is not supported on this endpoint.

  `GET https://dev.piyango.online/api/random/:gameId`

  - #### URL Parameters

    | Key    | Type | Required | Description                                                                                                           |
    | ------ | ---- | -------- | --------------------------------------------------------------------------------------------------------------------- |
    | gameId | Enum | Yes      | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto` |

    #### Query parameters

    The following query parameters are allowed:

    | Query param | Type   | Required | Default value                           | Description                        |
    | ----------- | ------ | -------- | --------------------------------------- | ---------------------------------- |
    | col         | Number | No       | 1 coupon worth of guesses for each game | Number of columns to be generated. |

    #### Example Request

    https://dev.piyango.online/api/random/sanstopu

    https://dev.piyango.online/api/random/sanstopu?col=10

* ### Embed

  Get embeddable HLS stream of the draw. Returns dummy stream if the requested stream is not found.

  `GET https://dev.piyango.online/api/embed/:gameId/:drawDate`

  - #### URL Parameters

    | Key      | Type | Required | Description                                                                                                                      |
    | -------- | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
    | gameId   | Enum | Yes      | A unique value used to identify games. Should be one of the following: `sayisal`, `sanstopu`, `onnumara`, `superloto`, `piyango` |
    | drawDate | Date | Yes      | The date of the draw in `YYYYMMDD` format.                                                                                       |

    #### Example Request

    https://dev.piyango.online/api/embed/sayisal/20200314

- ### Server Time

  Get the time of the server as a [moment object](https://momentjs.com/docs/#/displaying/as-object/).

  `GET https://dev.piyango.online/api/time`

  #### Example Request

  https://dev.piyango.online/api/time
