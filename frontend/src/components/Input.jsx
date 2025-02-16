import React,{useId} from 'react'


const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref){
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label  className='block text-sm font-medium text-gray-700' htmlFor={id}>
                {label}
                </label>
            }
            <input 
            type={type}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${className}`}
            ref={ref}
            {...props}
            id={id}
            />

          {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    
        </div>
    )

})


export default Input