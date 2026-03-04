export interface Terminal {
  idTerminal: number;
  terminal: string;
  prefijo: string;
}

export interface CreateTerminalDto {
  terminal: string;
  prefijo: string;
}

export interface UpdateTerminalDto {
  terminal?: string;
  prefijo?: string;
}
