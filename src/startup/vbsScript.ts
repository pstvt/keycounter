export default `Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run "npx --yes keycounter start",0,True`