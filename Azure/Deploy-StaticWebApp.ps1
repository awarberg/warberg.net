
$TenantId = "baf5bda5-9549-4edf-a4e7-97cc55dd3ca3"
$ResourceGroupName = "Sandbox"
$Subscription = Get-AzSubscription

if (-not $Subscription -or $Subscription.TenantId -ne $TenantId) {
    Disconnect-AzAccount
    Connect-AzAccount -Tenant $TenantId
}

$ResourceGroup = Get-AzResourceGroup -Name $ResourceGroupName
if (-not $ResourceGroup) {
    $ResourceGroup = New-AzResourceGroup -Name $ResourceGroupName -Location "West Europe"
}

$DeploymentName = "$ResourceGroupName-$((Get-Date).ToString('yyyy.MM.dd_HH:MM:ss'))"
$Secrets = Get-Content "..\secrets.nocommit.json" | ConvertFrom-Json
$TemplateParameters = @{ "repositoryToken" = $Secrets.repositoryToken }
New-AzResourceGroupDeployment `
    -Name $DeploymentName `
    -ResourceGroupName $ResourceGroupName `
    -TemplateFile "$PSScriptRoot\StaticWebApp.ARM-template.json" `
    -TemplateParameterFile "$PSScriptRoot\StaticWebApp.ARM-parameters.json" `
    @TemplateParameters
    