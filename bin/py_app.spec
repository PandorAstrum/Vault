# -*- mode: python -*-

block_cipher = None

added_datas = [
            ('base_app\\home', 'base_app\\home'),
            ('base_app\\login', 'base_app\\login'),
            ('base_app\\static', 'base_app\\static'),
            ('base_app\\templates', 'base_app\\templates')
         ]

added_pathex = [
            'C:\\Users\\Ana Ash\\Desktop\\Project Software\\Final\\bin'
        ]

hidden_imported = [
        ]

added_binaries = [
    ]

a = Analysis(['base_app\\run_app.py'],
             pathex=added_pathex,
             binaries=added_binaries,
             datas=added_datas,
             hiddenimports=hidden_imported,
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='py_app',
          debug=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               name='py_app')
