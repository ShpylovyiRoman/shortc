# shortc

This program is designed to facilitate interaction with the command line.
With its help, you can record commands that you rarely use and often forget, and they will be available for your viewing at any time.



## Usage

All commands are saved to the `$HOME/.shortc.json` file. You can change the path to the firectory, by setting `SHORTC_PATH` environment variable.

To add the command:

```bash
$ node shortc add --name "tar xvf source.tar.gz" --desc "Extract a (compressed) archive file into the current directory verbosely"
```

To list all the commands:
```bash
$ node shortc read
```

To find the command with regexp:
```bash
$ node shortc find "curl"
```

To remove the command by name:
```bash
$ node shortc remove "curl --user myusername:mypassword http://example.com"
```

To show the save path:
```bash
$ node shortc path
```
