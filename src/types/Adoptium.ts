
export interface Adoptium {
    binary: Binary;
    release_link: string;
    release_name: string;
    vendor: string;
    version: Version;
}

export interface Binary {
    architecture: string;
    download_count: number;
    heap_size: string;
    image_type: string;
    jvm_impl: string;
    os: string;
    package: Installer;
    project: string;
    scm_ref: string;
    updated_at: string;
    installer?: Installer;
}

export interface Installer {
    checksum: string;
    checksum_link: string;
    download_count: number;
    link: string;
    metadata_link: string;
    name: string;
    size: number;
}

export interface Version {
    build: number;
    major: number;
    minor: number;
    openjdk_version: string;
    security: number;
    semver: string;
}
