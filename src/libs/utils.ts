export const ExpirationDate = Math.floor(Date.now() / 1000) + (60 * 60);

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const onlyAlphbetRegex = /^[a-zA-Z ]*$/;

export const adminOperations = ['create', 'read', 'write', 'verify', 'update', 'delete'];

export const consumerOperations = ['read'];

export const admin = 'admin';

export const consumer = 'consumer';
