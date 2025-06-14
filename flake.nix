{
  # Useful tool to find specific nix revisions if you need old packages:
  # https://lazamar.co.uk/nix-versions/
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShell = with pkgs;
          mkShell {
            buildInputs = [
              pkgs.nodejs_22
              pkgs.podman
            ];

            shellHook = ''
            '';
          };
      });
}