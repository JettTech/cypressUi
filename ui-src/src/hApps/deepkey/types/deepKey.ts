export type Hash = string
export type Address = string
// export type Signature = string
// export type PackageRequest = object
// export type HolochainError = object

// tslint:disable no-consecutive-blank-lines
export interface Rule {
  keyset_root: Hash,
  revocation_key: Hash,
  prior_revocation_self_sig?: string
}

export interface Key {
  address: Hash,
  keyType: string
}

export interface Authorizor {
  authorizationKey: Hash,
  revocationAuthority: Hash,
  revocationSig: string
}
