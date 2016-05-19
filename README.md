electron-installer-squirrel-windows

electron-packager . Conges --platform=win32 --arch=x64 --icon=./conges.ico --out=Staging --version-string.CompanyName=UdL --version-string.ProductName=Conges --version-string.ProductVersion=1.0 --overwrite

~~~
brew install wine
npm install
bower install
npm run build
~~~


"build": "electron-packager . conges --platform=win32 --arch=x64 --icon=./conges.ico --out=dist --version-string.CompanyName=UdL --version-string.ProductName=Conges --version-string.ProductVersion=1.0 --overwrite",



"scripts": {
  "start": "electron ./src",
  "build-mac": "electron-packager ./src conges --platform=darwin --arch=x64 --icon=./conges.icns --out=dist --version-string.CompanyName=UdL --version-string.ProductName=Conges --version-string.ProductVersion=1.0 --overwrite",
  "build-win": "electron-packager ./src conges --platform=win32 --arch=x64 --icon=https://raw.githubusercontent.com/zzOzz/conges/master/conges.ico --out=dist --version-string.CompanyName=UdL --version-string.ProductName=Conges --version-string.ProductVersion=1.0 --overwrite",
  "setup-win": "electron-installer-windows --src dist/conges-win32-x64/ --dest dist/installers/"
},




"start": "electron ./src/",
"build": "npm build:mac && npm build:win",
"build:mac": "electron-packager ./src conges --platform=darwin --arch=x64 --icon=./conges.icns --out=dist --version-string.CompanyName=UdL --version-string.ProductName=Conges --version-string.ProductVersion=1.0 --overwrite",
"build:win": "electron-packager ./src conges --platform=win32 --arch=x64 --icon=https://raw.githubusercontent.com/zzOzz/conges/master/conges.ico --out=dist --version-string.CompanyName=UdL --version-string.ProductName=Conges --version-string.ProductVersion=1.0 --overwrite",
"setup:win": "electron-installer-windows --src ./dist/conges-win32-x64/ --dest ./dist/installers/ --config ./package.json"
