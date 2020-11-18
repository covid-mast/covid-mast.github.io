# Quick start

## Initialize all submodules
```
git submodule update --init --recursive
```

## Install all dependencies
```
npm install --dev
```

## Compile template
```
node node_modules/mustache/bin/mustache \
    countryView.json index.html.mustache > index.html
```

## Serve
```
npm start
```