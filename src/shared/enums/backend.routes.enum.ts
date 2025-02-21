export enum BACKEND_ROUTES {
  SWITCHES_HARDENING = "/switches/checkHardening/:switchId",
  SWITCHES_HARDENING_RESULTS = "/hardeningResults/switches/:id",
  SWITCHES_HARDENING_VERSIONS = "/hardeningResults/switches/versions/:id",
  SWITCHES_GET_ASSETS = "/switches/createAsset/:id",
}
