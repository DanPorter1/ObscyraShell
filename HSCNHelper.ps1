Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Create the form
$form = New-Object System.Windows.Forms.Form
$form.Text = "Router Diagnostics"
$form.Size = New-Object System.Drawing.Size(800, 800)
$form.StartPosition = "CenterScreen"

# Create TabControl
$tabs = New-Object System.Windows.Forms.TabControl
$tabs.Size = New-Object System.Drawing.Size(780, 750)
$tabs.Location = New-Object System.Drawing.Point(10, 10)

function Add-Tab {
    param ($title, $fields)

    $tab = New-Object System.Windows.Forms.TabPage
    $tab.Text = $title

    $script:controls = @{}
    $y = 10
    foreach ($field in $fields) {
        $label = New-Object System.Windows.Forms.Label
        $label.Text = $field
        $label.Location = New-Object System.Drawing.Point(10, $y)
        $label.Size = New-Object System.Drawing.Size(300, 20)
        $tab.Controls.Add($label)

        if ($field -in @("Contact Name", "Contact Number", "Address", "Default Gateway")) {
            $textbox = New-Object System.Windows.Forms.TextBox
            $textbox.Location = New-Object System.Drawing.Point(320, $y)
            $textbox.Size = New-Object System.Drawing.Size(400, 20)
            $tab.Controls.Add($textbox)

            $controls[$field] = $textbox
            $y += 30

        } elseif ($field -in @("Is Internet Working", "Has 3G Backup")) {
            $panel = New-Object System.Windows.Forms.Panel
            $panel.Location = New-Object System.Drawing.Point(320, $y)
            $panel.Size = New-Object System.Drawing.Size(400, 25)

            $yes = New-Object System.Windows.Forms.CheckBox
            $yes.Text = "Yes"
            $yes.Location = New-Object System.Drawing.Point(0, 0)

            $no = New-Object System.Windows.Forms.CheckBox
            $no.Text = "no"
            $no.Location = New-Object System.Drawing.Point(110, 0)

            $panel.Controls.AddRange(@($yes, $no))
            $tab.Controls.Add($panel)
            $controls[$field] = @($yes, $no)
            $y += 30
        } else {
            $panel = New-Object System.Windows.Forms.Panel
            $panel.Location = New-Object System.Drawing.Point(320, $y)
            $panel.Size = New-Object System.Drawing.Size(400, 25)

            $solid = New-Object System.Windows.Forms.CheckBox
            $solid.Text = "Solid"
            $solid.Location = New-Object System.Drawing.Point(0, 0)

            $flashing = New-Object System.Windows.Forms.CheckBox
            $flashing.Text = "Flashing"
            $flashing.Location = New-Object System.Drawing.Point(110, 0)

            $off = New-Object System.Windows.Forms.CheckBox
            $off.Text = "Off"
            $off.Location = New-Object System.Drawing.Point(230, 0)

            $panel.Controls.AddRange(@($solid, $flashing, $off))
            $tab.Controls.Add($panel)
            $controls[$field] = @($solid, $flashing, $off)
            $y += 30
        }
    }

    function IsControlOnTab($ctrl, $tab) {
        $parent = $ctrl
        while ($parent -ne $null) {
            if ($parent -eq $tab) { return $true }
            $parent = $parent.Parent
        }
        return $false
    }

    # Copy Button
    $copyBtn = New-Object System.Windows.Forms.Button
    $copyBtn.Text = "Copy"
    $copyBtn.Size = New-Object System.Drawing.Size(100, 30)
    $copyBtn.Location = New-Object System.Drawing.Point(10, ($y + 10))

    $copyBtn.Add_Click({
        $text = ""
        $currentTab = $tabControl.SelectedTab

        foreach ($key in $script:controls.Keys) {
            $control = $script:controls[$key]
            $belongsToTab = $false

            # Handle checkbox arrays
            if ($control -is [System.Collections.IEnumerable] -and -not ($control -is [System.Windows.Forms.Control])) {
                foreach ($c in $control) {
                    if (IsControlOnTab $c $currentTab) { $belongsToTab = $true; break }
                }
            } else {
                if (IsControlOnTab $control $currentTab) { $belongsToTab = $true }
            }

            if ($belongsToTab) {
                # Checkbox group
                if ($control -is [System.Collections.IEnumerable] -and -not ($control -is [System.Windows.Forms.Control])) {
                    $checkedItems = @()
                    foreach ($chk in $control) {
                        if ($chk.Checked) { $checkedItems += $chk.Text }
                    }
                    $text += "$key : " + ($(if ($checkedItems.Count -gt 0) { $checkedItems -join ', ' } else { 'None' })) + "`r`n"
                }
                # Textbox
                elseif ($control -is [System.Windows.Forms.TextBox]) {
                    $text += "$key : $($control.Text)`r`n"
                }
            }
        }

        if ([string]::IsNullOrEmpty($text)) { $text = "No fields filled or boxes checked" }

        [System.Windows.Forms.Clipboard]::SetText($text)
        [System.Windows.Forms.MessageBox]::Show("Copied current tab data!")
    })



    $tab.Controls.Add($copyBtn)

    # Email Button
    $emailBtn = New-Object System.Windows.Forms.Button
    $emailBtn.Text = "Email"
    $emailBtn.Size = New-Object System.Drawing.Size(100, 30)
    $emailBtn.Location = New-Object System.Drawing.Point(120, ($y + 10))
    $emailBtn.Add_Click({
        $body = ""
        foreach ($key in $controls.Keys) {
            $body += "$key : $($controls[$key].Text)%0D%0A"
        }
        $mailto = "mailto:?subject=$title Diagnostics&body=$body"
        Start-Process $mailto
    })
    $tab.Controls.Add($emailBtn)

    $tabs.TabPages.Add($tab)
}

# Define fields for each router type
$900 = @(
    "Contact Name", "Contact Number", "Address",
    "System LED", "xDSL CD LED", "xDSL DATA LED",
    "Default Gateway", "Can Ping Gateway",
    "System LED (Post)", "xDSL CD LED (Post)", "xDSL DATA LED (Post)",
    "Is Internet Working", "Has 3G Backup"
) #13

$800 = @(
    "Contact Name", "Contact Number", "Address",
    "CD Light", "OK Light", "PPP Light",
    "Default Gateway", "Can Ping Gateway",
    "CD Light (Post)", "OK Light (Post)", "PPP Light (Post)",
    "Is Internet Working", "Has 3G Backup"
) #13

$3g = @(
    "Contact Name", "Contact Number", "Address",
    "Power (Before)", "Service (Before)", "WWAN (Before)", "Signal (Before)",
    "Power (After)", "Service (After)", "WWAN (After)", "Signal (After)",
    "Mobile Signal Quality"
) #12

$4g = @(
    "Contact Name", "Contact Number", "Address",
    "PWR (Before)", "SIM1 (Before)", "SIM2 (Before)", "ETH (Before)",
    "3G", "4G", "Signal Bars",
    "PWR Socket", "LAN1", "LAN2", "LAN3", "WAN", "SIM1 Socket", "SIM2 Socket",
    "PWR (After)", "SIM1 (After)", "SIM2 (After)", "ETH (After)",
    "3G (After)", "4G (After)", "Signal Bars (After)"
) #24

# Add tabs
Add-Tab "Cisco 927" $900
Add-Tab "8xx Series" $800
Add-Tab "3G DigiTransport" $3g
Add-Tab "4G Teltonika RUTX09" $4g

# Add tabs to form
$form.Controls.Add($tabs)


# Show the form
$form.ShowDialog()