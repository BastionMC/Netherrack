#!/usr/bin/bash

if [$1 = ""]; then
  node tests/ --test
else
  node $1 --test
fi


