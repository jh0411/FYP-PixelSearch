import React, { Component } from 'react';
import ImgHash from '../abis/ImgHash.json';
import cryptMethods from './ImgEnc';
import imageIndex from './ImgIndex';
import jwtAuth from './jwtAuth';
import UINavBar from './UINavBar';
import Main from './Main';
import Web3 from 'web3'; // turns the client side application to a blockchain application
import './App.css';
//import * as ml5 from "ml5";

const crypto = require('crypto')
const CID = require('cids')
const ipfsClient = require('ipfs-http-client')
const NodeRSA = require('node-rsa');
const ipfsAPI = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
//const feature = ml5.featureExtractor("MobileNet");

var toBuffer = require('typedarray-to-buffer')
var secretPassphrase = crypto.randomBytes(256).toString('hex')
var encImgHash
var fileLink
var imgHash
var imgIndex
var imgIndex1
var token
var convEncImg
var encryptedToken
var decryptedToken

const sysPubKey = new NodeRSA('-----BEGIN RSA PUBLIC KEY-----\n' +
'MIIBCgKCAQEAy7ewBrCZbL35qk5khJKrHHvUOG9fFmtB7GC05TByDAsmgFF7M/dV\n' +
'haiphLw3TetpEndPslicczxsZ9Hb70aofcLwXGG3DYG3i9o7iTB+Hwztfw0c1lbc\n' +
'M/GZLrjQw1X9j6PVf0tIZBYNlvVNCzLQIbdoFQiHP//iRHFJVhsEQSSIDjv9VJ6E\n' +
'09hE6UBgmJ4evg13L3VC4HdfliQw2LnCc9dj5lrMCvBWHec4jeWbmKT4WN/X7Pf4\n' +
'g/7mmULsumJ6d0i4NBDWnHLuQP1/CkE+nquv3ylLlmrkW1bV4ZWACv6xNAtJpWSo\n' +
'DNVxs/Zvf7+GPZ56SAsuVnbtLNASoXplSwIDAQAB\n' +
'-----END RSA PUBLIC KEY-----')

const sysPrivKey = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIIEpAIBAAKCAQEAy7ewBrCZbL35qk5khJKrHHvUOG9fFmtB7GC05TByDAsmgFF7\n' +
  'M/dVhaiphLw3TetpEndPslicczxsZ9Hb70aofcLwXGG3DYG3i9o7iTB+Hwztfw0c\n' +
  '1lbcM/GZLrjQw1X9j6PVf0tIZBYNlvVNCzLQIbdoFQiHP//iRHFJVhsEQSSIDjv9\n' +
  'VJ6E09hE6UBgmJ4evg13L3VC4HdfliQw2LnCc9dj5lrMCvBWHec4jeWbmKT4WN/X\n' +
  '7Pf4g/7mmULsumJ6d0i4NBDWnHLuQP1/CkE+nquv3ylLlmrkW1bV4ZWACv6xNAtJ\n' +
  'pWSoDNVxs/Zvf7+GPZ56SAsuVnbtLNASoXplSwIDAQABAoIBAAIvazz3If4vn4D7\n' +
  'LErbw+gfT+x3DV8RMXjWpLocpeyJJhWUSi0JhypS39ajqjg0wUDIdNtl5e+6gzMt\n' +
  '5h0P9fi7YZasGamUbaKbaa4UDhZJLjcBrgCCmAQaoFkG9H5T6s9io4SlCxa/wc+P\n' +
  'vA7VsbPa4svu9nxyQzwWtwGscoQ8Wi2wgfOEFohlL1qtXYYyIyw/4vEAvAjUYzrg\n' +
  'FJiZNjN22ikElqKuLAJ2b0zJg6jt+oZHrp2+V1ijb4NBPGUIigmBNKBUCxqVovf/\n' +
  'AKXtpBw5lB+E/V2lTEHB7RaFFIfGQimFbpQtA1Pui0Dze75hwTCk6OE0QTriw0iz\n' +
  'M7j1ijkCgYEA7y64At/ddieo2IkfOTiGnndnccuPyGS5vb96rDQQ0h7vqSX4Zrzs\n' +
  '4WIm2jJtIujX2f1ZoTTlaDJCtZSRyknHCJkchJJ2+kGAqYbMfATPjMyH5/TU2o1j\n' +
  'YaflyKWTd6YX1pGMhtDGDdoVcECGJquZPRIOxtKFqIQyPXrnxt6Gnq0CgYEA2gqZ\n' +
  'mCBBlfY2EcBeQh5NoC46hrR+C5NBzFlHwNhwkWfSYZTHB0FWmI20zVfljgKYg9y5\n' +
  'O6mFmoXjdwxuQgXvLKmlasnHOPxcZlz6hK9mBxTkp9WIMXDvgwuACctsWOzO180/\n' +
  'ud6Zr1bZEJCqqQOsFgsdh7gc2kD5PqOHRvgF6tcCgYEAgCetKsUeWU+4tYULONKj\n' +
  'tsbNo3hpqvrlVtkA9sHS/XLcAOq6ZPn3hm/b12/LcDgIZ+HKo4i/HoxHmBlp4FSV\n' +
  'k3LOh+4eV8q/EJaMfCrrtkpky5Ewd4XoaQvYICEvmZ1iCnLkM9wrMoLWl9XKy2+I\n' +
  'ZOOHDVsBiKCEdtKi27ihsuUCgYAWEWaUQAeDTwUP7OFdXcXLhYJE6fWr5D6PmSWq\n' +
  '/fz+qnxfhfhS4qkKDaWT9uZz5g1bozZYNIMiLZTlEqwCIKmhYpYsZbm1Kc2MSrLM\n' +
  'RRhVdSbjWbhMELsdD0fpNd6EbYtNyic9/6qcVXTouUuciZOcM4nMl7TL3jGbxl9F\n' +
  'roqixwKBgQDaMLKo/oCAv+j7V9jtIfj4qX4qAkc8Os3ujJq8LAKLog8Qy+1ebXFF\n' +
  'VQyR9tVS4Jfuvb1oKX3KclXNgFQc7h9Q4G5rIekZOe2gLlJJUCDxf+jO0+oK+cnP\n' +
  'cyPcK3H0sg9yTVQphgzFC4lrCBu4a/+vXxkGu2o9XaJ42P4awPT6aA==\n' +
  '-----END RSA PRIVATE KEY-----')

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //web3 blockchain connection with our client application
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected.')
    }
  }

  //Read the account, network, smart contract and hash value
  //smart contract needs ABI and address
  async loadBlockchainData() {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() //when deploying smart contract, we need ABI and the address
    const networkData = ImgHash.networks[networkId]

    if (networkData) {
      //token generation for authorization
      token = jwtAuth.authorizeToken({ accounts }, secretPassphrase);
      encryptedToken = sysPubKey.encrypt(token, 'base64');
      console.log("Encrypted Token", encryptedToken);

      //fetch contract
      const abi = ImgHash.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      console.log(contract)

      //Get Image Amount
      const imageCount = await contract.methods.fileCount().call()
      this.setState({ imageCount })

      // Load files & sort by the newest
      for (var i = imageCount; i >= 1; i--) {
        const image = await contract.methods.files(i).call()
        this.setState({
          files: [...this.state.files, image]
        })
      }
      console.log(this.state.files)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      account: '',
      buffer: null,
      contract: null,
      fileLink: '',
      imgHash: '',
      encImgHash: '',
      files: [],
      loading: false,
      name: null,
      type: null,
      web3: null,
    }

    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
  }

  captureFile = (event) => {
    event.preventDefault()
    console.log('Image Captured...')

    //Process files for IPFS
    const image = event.target.files[0] //read the information of the file object of key [0]
    const reader = new window.FileReader() //convert the file into a buffer to put the file into IPFS

    // var imageOutput = document.getElementById('output');
    // imageOutput.src = URL.createObjectURL(event.target.files[0]);

    // const logits = feature.infer(imageOutput);
    // console.log(logits.dataSync())

    reader.readAsArrayBuffer(image) //reads the data as buffer that is going to send to ipfs after is processed
    reader.onloadend = () => { //set the converted format of the file
      this.setState({
        buffer: Buffer(reader.result),
        type: image.type,
        name: image.name
      })
      console.log('Image Buffer', this.state.buffer)
    }
  }

  uploadFile = Tag => {
    console.log("Submitting image to IPFS...")

    var timeBefore = performance.now()
    var encryptImg = cryptMethods.imageEncryption(this.state.buffer)
    var timeAfter = performance.now()

    console.log("Image took " + (timeAfter - timeBefore) + "ms to encrypt.")

    const encryptTag = cryptMethods.tagEncryption(Tag)
    this.setState({ encryptTag })

    convEncImg = new Uint8Array([])
    convEncImg = toBuffer(encryptImg)
    console.log('Encrypted Image', convEncImg)

    decryptedToken = sysPrivKey.decrypt(encryptedToken, 'utf8')
    console.log(decryptedToken)
    var verifyToken = jwtAuth.verifyToken(decryptedToken, secretPassphrase);

    if (verifyToken) {
      console.log(JSON.stringify({ message: "User is authorised, invoking uploading process", address: this.state.account, token: token, auth: true }));

      // Add file to the IPFS
      ipfsAPI.add(convEncImg, (error, result) => {
        encImgHash = new CID(result[0].hash).toV1().toString('base32')
        this.setState({ encImgHash })
        //console.log('IPFS result', result)

        if (error) {
          console.error(error)
          return
        }
        this.setState({ loading: true })
      })

      // Add file to the IPFS
      ipfsAPI.add(this.state.buffer, (error, result) => {
        imgHash = new CID(result[0].hash).toV1().toString('base32')
        this.setState({ imgHash })
        //console.log('IPFS result', result)

        if (error) {
          console.error(error)
          return
        }

        this.setState({ loading: true })

        // Assign value for the file without extension
        if (this.state.type === '') {
          this.setState({ type: 'none' })
        }

        if (this.state.contract) {
          this.state.contract.methods.uploadImage(this.state.imgHash, result[0].size, this.state.type, this.state.name, this.state.encryptTag)
            .send({ from: this.state.account }, function (err, res) {
              if (err) {
                console.error(err)
                console.log('Contract state is empty')
                return;
              }
              else {
                console.log(res)
                imgIndex = imageIndex.addImgIDHash(encryptTag, imgHash)
                imgIndex1 = imageIndex.addEncryptImgHash(encryptTag, encImgHash)
                fileLink = 'https://ipfs.infura.io/ipfs/' + encImgHash
                console.log('Image Submitted', imgIndex1)
                console.log("Encrypted Image link: ", fileLink)
                console.timeStamp(imgIndex)
              }
            }).on('transactionHash', (hash) => {
              this.setState({
                loading: false,
                type: null,
                name: null
              })
            }).on('error', (e) => {
              window.alert('Error')
              this.setState({ loading: false })
            })
        }
      })
    }
    else {
      console.log(JSON.stringify({ message: "User failed to authenticate, Token failed to match!", auth: false }));
    }
  }

  searchSubmit = searchQuery => {

    console.log('Search Clicked:', searchQuery)

    let keywordCaptured = searchQuery
    var encryptedQuery = cryptMethods.tagEncryption(keywordCaptured)

    var verifyToken = jwtAuth.verifyToken(token, secretPassphrase);

    if (verifyToken) {

      console.log(JSON.stringify({ message: "User is authorised, invoking searching process", address: this.state.account, token: token, auth: true }));

      this.setState({ loading: true })

      if (this.state.contract) {
        this.state.contract.methods.searchImage(encryptedQuery)
          .send({ from: this.state.account, gas: 5000000, gasPrice: 20000 }, function (err, res) {
            if (err) {
              console.log("Error", err)
              return;
            }
            else {
              console.log(res)
              imgIndex = imageIndex.searchImg(encryptedQuery)
            }
          }).on('transactionHash', (hash) => {
            this.setState({
              loading: false,
              type: null,
              name: null
            })
          }).on('error', (e) => {
            window.alert('Error')
            this.setState({ loading: false })
          })
      }
    }
    var decImg = cryptMethods.imageDecryption(convEncImg)
    var convDecImg = new Uint8Array([])
    convDecImg = toBuffer(decImg)
    console.timeStamp(convDecImg)
  }

  //var b64EncImg = Buffer.from(convEncImg).toString('base64')
  // var decImg = cryptMethods.fileDecryption(convEncImg)

  // var convDecImg = new Uint8Array([])
  // convDecImg = toBuffer(decImg)
  // console.log('Decrypted Image', convDecImg)

  // await ipfs.add(convDecImg, (error, result) => {
  //   console.log('Ipfs result', result)
  //   imgHash = new CID(result[0].hash).toV1().toString('base32') //conver the CID of the image hash to a newer version (CIDv1)
  //   this.setState({ imgHash })

  //   if (error) {
  //     return
  //   }

  //   this.state.fileLink = 'https://ipfs.infura.io/ipfs/' + imgHash
  //   console.log(this.state.fileLink)
  // })
  // }

  render() { //function is called when the content is lay out of the page (can mix html and js tgt)
    return (
      <div>
        <UINavBar account={this.state.account} />
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Hold on a second, we are processing your request...</p></div>
          : <Main
            files={this.state.files}
            captureFile={this.captureFile}
            uploadFile={this.uploadFile}
            searchSubmit={this.searchSubmit}
          />
        }
      </div>
    );
  }
}

export default App;