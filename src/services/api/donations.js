import axios from 'axios'
import { authRequest } from 'src/utils/network'

const CancelToken = axios.CancelToken
let cancel
