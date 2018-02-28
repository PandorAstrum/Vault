@ECHO OFF
REM Runs both my project scripts

ECHO Running pyinstaller to generate spec
pyi-makespec run_app base_app/run_app.py
ECHO Finished making spec file
PAUSE