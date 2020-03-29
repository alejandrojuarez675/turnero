now=$(date)
echo borrando archivos anteriores...
cd ../turnero-demo/
rm -R assets
cd ../turnero-hospital-espaniol/turnero-hospital-espaniol/
echo compilando...
ng build --base-href turnero-demo
echo compilacion completa
cd dist/turnero-hospital-espaniol/
mv * ../../../../turnero-demo/
cd ../../../../turnero-demo/
echo publicando demo en github
git add .
git commit -m "commit automatico - ${now}"
git push
