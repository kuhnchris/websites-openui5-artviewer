# artViewer

ArtViewer (basically a list with viewerJS integration) with automated GitHub Actions for updating my art aswell as keeping track of it.

## Why GitHub Actions?

If I commit my art, the push hook will extract the complete image (stored by Krita) in the .kra files, trim it, and put it into the art folder, as well as creating an external JSON array containing all art in the directory. Basically minimizing chances of an error.

## Credits

This project has been generated with 💙 and [easy-ui5](https://github.com/SAP)
viewerjs over at [GitHub](https://github.com/fengyuanchen/viewerjs)
