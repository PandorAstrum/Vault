@ECHO OFF
REM Runs both my project scripts

ECHO Running pyinstaller
python -m PyInstaller --workpath py_dist\build --distpath py_dist\dist py_app.spec
ECHO Finished
PAUSE