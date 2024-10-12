#!/bin/bash

set -x

node bin2bdf.mjs
bitsnpicas.sh convertbitmap -t ttf -o CALL3327.ttf font.bdf
fonttools ttLib --flavor woff -o CALL3327.woff CALL3327.ttf
fonttools ttLib --flavor woff2 -o CALL3327.woff2 CALL3327.ttf

node bin2bdf2.mjs
bitsnpicas.sh convertbitmap -t ttf -o CALL3327_2.ttf font2.bdf
fonttools ttLib --flavor woff -o CALL3327_2.woff CALL3327_2.ttf
fonttools ttLib --flavor woff2 -o CALL3327_2.woff2 CALL3327_2.ttf

node bin2bdf2s.mjs
bitsnpicas.sh convertbitmap -t ttf -o CALL3327_2s.ttf font2s.bdf
fonttools ttLib --flavor woff -o CALL3327_2s.woff CALL3327_2s.ttf
fonttools ttLib --flavor woff2 -o CALL3327_2s.woff2 CALL3327_2s.ttf

node bin2bdf_mono.mjs
bitsnpicas.sh convertbitmap -t ttf -o CALL3327_mono.ttf mono.bdf
fonttools ttLib --flavor woff -o CALL3327_mono.woff CALL3327_mono.ttf
fonttools ttLib --flavor woff2 -o CALL3327_mono.woff2 CALL3327_mono.ttf
