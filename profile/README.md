# Snapintosh

Run macOS on the Snapdragon X2 Elite (ASUS Zenbook A16) under an EL2 hypervisor.

Snapintosh is an independent project. It has four parts:
- an EL2 monitor that hosts Apple's own macOS 27 kernel;
- a UEFI proxy and loader, [q1n1](https://github.com/Snapintosh/q1n1);
- a native Adreno X2-90 graphics stack: a kernel driver, a Metal plug-in and a shader compiler;
- drivers for the laptop's input devices and Wi-Fi.

It is not affiliated with Apple, Qualcomm, ASUS or Asahi Linux. No Apple, Qualcomm or ASUS software is
distributed.

Start with the [Snapintosh repository](https://github.com/Snapintosh/Snapintosh).
