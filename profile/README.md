<p align="center">
  <a href="https://github.com/Snapintosh/Snapintosh">
    <picture>
      <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/snapintosh-hero-mobile.svg">
      <img src="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/snapintosh-hero.svg" width="100%" alt="Snapintosh — macOS on Snapdragon. Built for the ASUS Zenbook A16 with Snapdragon X2 Elite.">
    </picture>
  </a>
</p>

<p align="center">
  <strong>An independent, open-source effort to bring macOS to Snapdragon laptops.</strong><br>
  Starting with the ASUS Zenbook A16: an EL2 monitor, a UEFI boot path,<br>
  native Adreno graphics, and the drivers that bring the hardware together.
</p>

<p align="center">
  <a href="https://github.com/Snapintosh/Snapintosh"><strong>Start here →</strong></a> &nbsp; · &nbsp;
  <a href="https://github.com/Snapintosh/Snapintosh/blob/main/docs/STATUS.md">Status &amp; roadmap</a> &nbsp; · &nbsp;
  <a href="https://github.com/Snapintosh/Snapintosh/blob/main/docs/ARCHITECTURE.md">Architecture</a> &nbsp; · &nbsp;
  <a href="https://github.com/Snapintosh/Snapintosh/blob/main/docs/BUILDING.md">Build guide</a>
</p>

<p align="center">
  <a href="https://discord.gg/GjMXm3NaPe"><strong>Join the Discord community →</strong></a> &nbsp; · &nbsp;
  <a href="https://www.reddit.com/r/armintosh/">r/armintosh</a> &nbsp; · &nbsp;
  <a href="https://www.reddit.com/r/snapintosh/">r/snapintosh</a>
</p>

---

### From boot to desktop

[**Snapintosh**](https://github.com/Snapintosh/Snapintosh) is the core: the EL2 monitor, platform compatibility layer, boot orchestration, and project documentation. These companion projects provide the boot path, graphics stack, and device support.

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://github.com/Snapintosh/q1n1"><img src="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/boot.svg" width="48" height="48" alt="q1n1 logo"></a>
      <h3><a href="https://github.com/Snapintosh/q1n1">q1n1</a></h3>
      <strong>Boot &amp; hardware access</strong>
      <p>UEFI loader and EL2 hardware proxy for Snapdragon, built on the foundations of m1n1.</p>
    </td>
    <td width="50%" valign="top">
      <a href="https://github.com/Snapintosh/SnapAdreno"><img src="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/graphics.svg" width="48" height="48" alt="SnapAdreno logo"></a>
      <h3><a href="https://github.com/Snapintosh/SnapAdreno">SnapAdreno</a></h3>
      <strong>GPU &amp; display</strong>
      <p>Adreno X2-90 kernel drivers for GPU execution, display, and the IOGPU interface.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://github.com/Snapintosh/SnapMetal"><img src="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/metal.svg" width="48" height="48" alt="SnapMetal logo"></a>
      <h3><a href="https://github.com/Snapintosh/SnapMetal">SnapMetal</a></h3>
      <strong>Native Metal</strong>
      <p>The Metal driver plug-in that connects macOS graphics workloads to Adreno.</p>
    </td>
    <td width="50%" valign="top">
      <a href="https://github.com/Snapintosh/air2ir3"><img src="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/compiler.svg" width="48" height="48" alt="air2ir3 logo"></a>
      <h3><a href="https://github.com/Snapintosh/air2ir3">air2ir3</a></h3>
      <strong>Shader compilation</strong>
      <p>Apple AIR to Mesa NIR to Adreno ir3: the compiler behind the graphics stack.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://github.com/Snapintosh/SnapI2CHID"><img src="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/input.svg" width="48" height="48" alt="SnapI2CHID logo"></a>
      <h3><a href="https://github.com/Snapintosh/SnapI2CHID">SnapI2CHID</a></h3>
      <strong>Keyboard &amp; touchpad</strong>
      <p>I2C-HID support for the built-in keyboard, precision touchpad, and multitouch input.</p>
    </td>
    <td width="50%" valign="top">
      <a href="https://github.com/Snapintosh/SnapQCC2072"><img src="https://raw.githubusercontent.com/Snapintosh/.github/main/profile/assets/wifi.svg" width="48" height="48" alt="SnapQCC2072 logo"></a>
      <h3><a href="https://github.com/Snapintosh/SnapQCC2072">SnapQCC2072</a></h3>
      <strong>Native Wi-Fi · in development</strong>
      <p>QCC2072 wireless support, with macOS Wi-Fi integration under active development.</p>
    </td>
  </tr>
</table>

### Built in the open. Still experimental.

The current target is the **ASUS Zenbook A16 (UX3607OA)** with **Snapdragon X2 Elite X2E-96-100**, running **macOS 27 build 26A428**. Every boot currently requires a Mac host connected over USB-C.

The project [reports a working desktop with Adreno graphics and built-in input](https://github.com/Snapintosh/Snapintosh/blob/main/docs/STATUS.md). Frame pacing and native Wi-Fi integration remain active work; several device features are unsupported. Read the **[current status and limitations](https://github.com/Snapintosh/Snapintosh/blob/main/docs/STATUS.md)** before building or running.

### Find your starting point

| If you want to… | Start here |
| :--- | :--- |
| Understand how it works | [Architecture](https://github.com/Snapintosh/Snapintosh/blob/main/docs/ARCHITECTURE.md) |
| Build from source | [Build guide](https://github.com/Snapintosh/Snapintosh/blob/main/docs/BUILDING.md) |
| Work with the target hardware | [Running guide](https://github.com/Snapintosh/Snapintosh/blob/main/docs/RUNNING.md) |
| Help move the project forward | [Roadmap](https://github.com/Snapintosh/Snapintosh/blob/main/docs/STATUS.md#roadmap) · [Issues](https://github.com/Snapintosh/Snapintosh/issues) |

Bring reproducible reports, clear hardware and build details, and logs that explain what happened. For component-specific work, use its issue tracker where available; report q1n1 issues in the [main repository](https://github.com/Snapintosh/Snapintosh/issues).

### Join the community

[**Snapintosh · Armintosh on Discord**](https://discord.gg/GjMXm3NaPe) is the community space for Snapdragon development, macOS and XNU research across other ARM platforms, hardware discussion, and reproducible technical help. Start in **#welcome**, read **#rules**, and find the channel for your project.

Share longer updates and discussions on [r/armintosh](https://www.reddit.com/r/armintosh/) for broader ARM research and [r/snapintosh](https://www.reddit.com/r/snapintosh/) for Snapdragon projects. Keep actionable bugs and contributions in the relevant GitHub repository so the work remains easy to track.

---

<sub>Snapintosh is independent and is not affiliated with Apple, Qualcomm, ASUS, or Asahi Linux. No Apple, Qualcomm, or ASUS software is distributed. q1n1 is derived from <a href="https://github.com/AsahiLinux/m1n1">m1n1</a>; shader compilation builds on <a href="https://gitlab.freedesktop.org/mesa/mesa">Mesa</a>. Third-party names and marks belong to their respective owners.</sub>
