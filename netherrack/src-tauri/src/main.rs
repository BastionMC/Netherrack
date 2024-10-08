// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Window};

// Create the command:
// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: Window) {
    // Close splashscreen
    window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
    // Show main window
    
    window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
    window.get_window("main").expect("no window labeled 'main' found").unminimize().unwrap();
    window.get_window("main").expect("no window labeled 'main' found").set_focus().unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
