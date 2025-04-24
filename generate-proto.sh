#!/bin/bash
PATH="$PATH:./node_modules/.bin" protoc --ts_proto_out=./types ./proto/*.proto --ts_proto_opt=nestJs=true
