#!/bin/sh

# go into uimodule folder
cd uimodule/webapp/art

# remove old temporary folder (if available)
rm -Rf .temp 2>&1 >/dev/null

echo -n "[" > list.json

cnt=0
for i in *.kra; do
    cnt=$((cnt+1))
    echo "${cnt}: processing ${i}"
    mkdir .temp
    cd .temp
    unzip -qq ../"${i}"
    if [ -e "mergedimage.png" ]; then
        convert -trim "mergedimage.png" -border 10x10 "../${i}.png"
        if [ -e "preview.png" ]; then
            convert -trim "preview.png" -border 10x10 "../${i}_thumb.png"
        fi
    else
        echo "${cnt}: ${i}: cannot find mergedimage.png!"
    fi
    if [ "${cnt}" -gt "1" ]; then
        echo -n "," >> ../list.json
    fi
    echo "\"../${i}.png\"" >> ../list.json
    cd ..
    rm -Rf .temp
done

echo -n "]" >> list.json
