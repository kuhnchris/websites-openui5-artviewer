#!/bin/sh
cd uimodule/webapp/art
echo -n "[" > list.json
cnt=0
for i in *.kra; do
    cnt=$((cnt+1))
    echo "${cnt}: processing ${i}"
    rm -Rf .temp
    mkdir .temp
    cd .temp
    unzip -qq ../"${i}"
    if [ -e "mergedimage.png" ]; then
        mv "mergedimage.png" "../${i}.png"
    else
        echo "${cnt}: ${i}: cannot find mergedimage.png!"
    fi
    if [ "${cnt}" -gt "1" ]; then
        echo -n "," >> ../list.json
    fi
    echo "\"../${i}.png\"" >> ../list.json

    cd ..
done

echo -n "]" >> list.json

