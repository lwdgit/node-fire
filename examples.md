> node-fire just a runner for these node_modules without cli. 

## Examples


1. [mathjs](https://github.com/josdejong/mathjs)

    ```
    $ npm install mathjs
    $ fire mathjs add 5.1 5.2
    ```

2. [node-open](https://github.com/pwnall/node-open)

    ```
    $ npm install open
    $ fire open index.html
    $ fire open http://127.0.0.1
    ```


## Known support list

| node modules | example |
| --- | --- |
| [shelljs](https://github.com/shelljs/shelljs) | fire shelljs ls stdout |
| [mathjs](https://github.com/josdejong/mathjs) | fire mathjs add 2.1 3.2 |
| [node-open](https://github.com/pwnall/node-open) | fire open http://127.0.0.1 |
| [public-ip](https://github.com/sindresorhus/public-ip) | fire public-ip v4 |
| [cpy](https://github.com/sindresorhus/cpy) | fire cpy ...1.html,2.html |
| [find-up](https://github.com/sindresorhus/find-up) | fire find-up 1.html |
| md5 | fire md5 test |
| sha1 | fire sha1 test |
| uuid | fire uuid |


