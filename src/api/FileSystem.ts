import fs from "fs";

/**
 * Promise-based alternative to {@link fs.writeFile }
 * 
 * @param path A path to a file. If a URL is provided, it must use the
 * file: protocol. If a file descriptor is provided, the underlying
 * file will not be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 */
export async function writeFile(file: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => err ? reject(err.message) : resolve());
    });
}

/**
 * Creates the given directory structure recursively
 * 
 * @param path The path to create
 * @returns true if any directories were created, false otherwise
 */
export async function mkdirRecursive(path: fs.PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            resolve(false);
            return;
        }

        fs.mkdir(path, { recursive: true }, err => err ? reject(err) : resolve(true));
    })
}
