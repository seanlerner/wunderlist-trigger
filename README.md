# Spotify trigger for Clip Trigger

Control Spotify with your clipboard.

# Getting Started

1. [Download Clip Trigger](https://github.com/seanlerner/clip-trigger-disttribution/blob/master/README.md)
2. Install and open Clip Trigger
3. Open the menu from the Clip Trigger icon (in your system tray)
4. Select Triggers
5. Click `Install` for this trigger

# Using

Copy `sp` + the Spotify command you'd like to issue.

<table>
  <tr><th>Copy to your clipboard</th><th>Description                                           </th></tr>
  <tr><td>sp setup                 </td><td>Setup spotify to authorize Clip Trigger               </td></tr>
  <tr><td>sp *                     </td><td>Add currently playing song to the *Starred* playlist  </td></tr>
  <tr><td>sp ?                     </td><td>Get info about currently playing song                 </td></tr>
  <tr><td>sp p                     </td><td>Play / pause playback                                 </td></tr>
  <tr>
    <td>sp r `abc`</td>
    <td>Plays playlist with the characters `abc`. If more than one playlist contains `abc`, than it will randomly select one of those playlists to play.</td>
  </tr>
  <tr><td>sp shoff                 </td><td>Turn shuffle on                                       </td></tr>
  <tr><td>sp shon                  </td><td>Turn shuffle off                                      </td></tr>
  <tr><td>sp sk                    </td><td>Skip to next track                                    </td></tr>
  <tr><td>sp +                     </td><td>Increase volume                                       </td></tr>
  <tr><td>sp -                     </td><td>Decrease volume                                       </td></tr>
  <tr><td>sp vol                   </td><td>Volume                                                </td></tr>
</table>

# About Clip Trigger

Clip Trigger is a background application that monitors your clipboard activity. When it sees a predefined trigger copied to the clipboard, it executes a process.

Main Clip Trigger repo: [https://github.com/seanlerner/clip-trigger](https://github.com/seanlerner/clip-trigger)
