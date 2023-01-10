use std::process::Command;

fn main() {
    // auto-generate typescript types file
    Command::new("typeshare")
        .arg("./") // recursively searches for enums and structs with the `#[typeshare]` attribute
        .arg("--lang=typescript")
        .arg("--output-file=typescript_definitions.ts")
        .spawn()
        .expect("typeshare command failed");
}
