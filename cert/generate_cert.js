// https://github.com/digitalbazaar/forge
const fs = require("fs");
const forge = require("node-forge");
forge.options.usePureJavaScript = true;

var pki = forge.pki;
var keys = pki.rsa.generateKeyPair(2048);
var cert = pki.createCertificate();

cert.publicKey = keys.publicKey;
cert.serialNumber = "01";
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

var attrs = [
	{
		name: "commonName",
		value: "www.antcipher.com",
	},
	{
		name: "countryName",
		value: "CL",
	},
	{
		shortName: "ST",
		value: "Santiago",
	},
	{
		name: "localityName",
		value: "Santiago",
	},
	{
		name: "organizationName",
		value: "AntCipher",
	},
	{
		shortName: "OU",
		value: "AntCypher",
	},
];
cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.setExtensions([
	{
		name: "basicConstraints",
		cA: true,
	},
	{
		name: "keyUsage",
		keyCertSign: true,
		digitalSignature: true,
		nonRepudiation: true,
		keyEncipherment: true,
		dataEncipherment: true,
	},
	{
		name: "extKeyUsage",
		serverAuth: true,
		clientAuth: true,
		codeSigning: true,
		emailProtection: true,
		timeStamping: true,
	},
	{
		name: "nsCertType",
		client: true,
		server: true,
		email: true,
		objsign: true,
		sslCA: true,
		emailCA: true,
		objCA: true,
	},
	{
		name: "subjectAltName",
		altNames: [
			{
				type: 6, // URI
				value: "http://www.mycooltest.site",
			},
			{
				type: 7, // IP
				ip: "127.0.0.1",
			},
		],
	},
	{
		name: "subjectKeyIdentifier",
	},
]);
cert.sign(keys.privateKey);

var private_key = pki.privateKeyToPem(keys.privateKey);
var public_key = pki.certificateToPem(cert);

console.log(public_key);
console.log(private_key);
fs.writeFileSync("private.pem", private_key);
fs.writeFileSync("public.crt", public_key);
