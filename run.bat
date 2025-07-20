@echo off
setlocal EnableDelayedExpansion

docker-compose down

REM Charger les variables depuis .env.local
for /f "usebackq tokens=1,* delims==" %%A in (".env.local") do (
    set "line=%%A"
    set "value=%%B"
    REM Ignorer les lignes vides ou commentées
    if not "!line!"=="" (
        if not "!line:~0,1!"=="#" (
            set "!line!=!value!"
        )
    )
)

REM Affichage de la variable (facultatif)
echo Client ID = %NEXT_PUBLIC_GOOGLE_CLIENT_ID%

REM Lancer le build Docker avec les variables d’environnement
docker build ^
  --build-arg NEXT_PUBLIC_GOOGLE_CLIENT_ID=%NEXT_PUBLIC_GOOGLE_CLIENT_ID% ^
  -t guaranty-app .

docker run -p 3000:3000 guaranty-app

endlocal