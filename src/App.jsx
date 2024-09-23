import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(7); 
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(function(){
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length )
      pass += str.charAt(char)
    }
    setPassword(pass);

  } , [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClip = useCallback( () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-1 my-8 text-orange-600 bg-gray-800 text-center '>
        <h1 className='text-white my-3 py-3 text-lg font-bold'>Password Generator</h1>
        
        <div className='flex shadow-md rounded-lg overflow-hidden mb-5 outline-none'>
          <input type="text" 
          value={password } 
          placeholder='Password' 
          className='w-full px-5 py-1' 
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClip}
          className='text-white px-2 py-1 outline-none bg-blue-500 hover:bg-blue-800'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" min={7} max={100}
            value={length}
            className='cursor-pointer'
            onChange={ function(e){
              setLength(e.target.value)
            }}
            />
            <label >Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={numberAllowed} 
            id="numberInput" 
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={charAllowed} 
            id="characterInput" 
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
