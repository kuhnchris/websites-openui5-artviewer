#!/bin/sh
cd uimodule/webapp/art
for i in *.kra; do
    echo "processing ${i}"
    rm -Rvf .temp
    mkdir .temp
    cd .temp
    unzip ../"${i}"
    if [ -e "mergedimage.png" ];
        mv "mergedimage.png" ../${i}.png
    else
        echo "${i}: cannot find mergedimage.png!"
    fi
done
   

