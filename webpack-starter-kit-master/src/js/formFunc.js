const formFunc = () => {
    
    const formData = {
        "step-1": {
            firstname: '',
            lastname: '',
            email: '',
        },
        "step-2": {
            phone: ''
        },
        "step-3": {
            purpose: ''
        },
    }

    const isCanToSecondStep = {
        "firstname": false,
        "lastname": false,
        "email": false,
    }

    const isCanToThirdStep = {
      "phone": false,
    }

    const isCanToSubmit = {
      "purpose": false,
    }
  

    

    const nextButton1 = document.getElementById('btn-next-1')
    const nextButton2 = document.getElementById('btn-next-2')
    const submitButton = document.getElementById('btn-next-3')
    const steps = document.querySelectorAll('.form-section__step')
    const stepsContainer = document.querySelector('.step-container')
    const validationMessage = document.querySelector('.form__message')

    const getCurrentId = (idString) => {
        const idArray = idString.split('-')
        const btnId = Number(idArray[idArray.length - 1])
        return btnId
    }    


    const showValidMessage = (currentStep, fieldName, message) => {
        const currentInput = document.querySelector(`input[name=${fieldName}]`)

        currentInput.nextElementSibling.classList.add('form__message--visible')
        currentInput.nextElementSibling.textContent = message

        if(currentStep === 'isCanToSecondStep') {
            isCanToSecondStep[fieldName] = false
        }
        if(currentStep === 'isCanToThirdStep') {
            isCanToThirdStep[fieldName] = false
        }
        if(currentStep === 'isCanToSubmit') {
            isCanToSubmit[fieldName] = false
        }
      
    }

    const hiddenValidMessage = (currentStep, fieldName) => {
        const currentInput = document.querySelector(`input[name=${fieldName}]`)
        currentInput.nextElementSibling.classList.remove('form__message--visible')
     
        if(currentStep === 'isCanToSecondStep') {
            isCanToSecondStep[fieldName] = true
        }
        if(currentStep === 'isCanToThirdStep') {
            isCanToThirdStep[fieldName] = true
        }
        if(currentStep === 'isCanToSubmit') {
            isCanToSubmit[fieldName] = true
        }
    }

    
    const validation = (fieldName) => {
        const {firstname, lastname, email} = formData["step-1"]
        const {phone} = formData["step-2"]
        const {purpose} = formData["step-3"]

        switch(fieldName) {
            case "firstname": {
                if(firstname.length <= 2 || firstname.length > 40) {
                   return showValidMessage('isCanToSecondStep', fieldName,'This field is required, min symbols 3, max 40')
                }
                return hiddenValidMessage('isCanToSecondStep',fieldName)
                break
            }

            case "lastname": {
                if(lastname.length <= 2 || lastname.length > 40) {
                    return showValidMessage('isCanToSecondStep', fieldName, 'This field is required, min symbols 3, max 40')
                 }
                 return hiddenValidMessage('isCanToSecondStep',fieldName)
                 break
            }
            case "email": {
                const emailPattern = new RegExp(
                    /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.]+[A-Za-z]{2,}$/)
                if(!emailPattern.test(email)){
                    return showValidMessage('isCanToSecondStep',fieldName, 'Incorrect email address')
                }
                return hiddenValidMessage('isCanToSecondStep', fieldName)
                break;
            }
            case "phone": {
                const phonePattern = new RegExp(
                    /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
                )
                if(!phonePattern.test(phone)) {
                    return showValidMessage('isCanToThirdStep', fieldName, 'Incorrect phone number')
                }
                return hiddenValidMessage('isCanToThirdStep', fieldName)
                break;
            }
            case "purpose": {
                if(purpose.length <= 0 || purpose.length > 40) {
                    return showValidMessage('isCanToSubmit', fieldName, 'This field is required, min symbols 3, max 60')
                }
                return hiddenValidMessage('isCanToSubmit', fieldName)
                break;
            }

            default: 
                return false
        }
    }

    const next = (btn) => {
        const btnId = getCurrentId(btn.id)
        const currentStepNode =  document.getElementById(`step-${btnId}`)
        const nextStepNode = document.getElementById(`step-${btnId + 1}`)

        if(btnId === 1) {
            const {firstname, lastname, email} = isCanToSecondStep
            if(!firstname) {
                validation('firstname')
                return
            }
            if(!lastname) {
                validation('lastname')
                return
            }
            if(!email) {
                validation('email')
                return
            }

        }

        if(btnId === 2) {
            const {phone} = isCanToThirdStep
        
        
            if(!phone) {
                validation('phone')
                return
            }
        }



        steps[btnId - 1].classList.remove('active-step')
        steps[btnId].classList.add('active-step')
        

        currentStepNode.style.transform = 
        `translateX(-${btnId * currentStepNode.clientWidth}px)`
        nextStepNode.style.transform = 
        `translateX(-${btnId * nextStepNode.clientWidth}px)`

        currentStepNode.classList.remove('step-visible')
        currentStepNode.classList.add('step-hidden')

        nextStepNode.classList.remove('step-hidden')
        nextStepNode.classList.add('step-visible')
    }

    const handleChange = e => {
        const {value, name, parentNode} = e.target
        const currentStep = parentNode.dataset.id

        formData[currentStep][name] = value

        validation(name)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
     
        if(!isCanToSubmit.purpose) {
            validation('purpose')
            return
        }

        const data = JSON.stringify({...formData["step-1"], 
        ...formData["step-2"], 
        ...formData["step-3"]})

        alert(data)
    }


    nextButton1.addEventListener('click',  () => next(nextButton1))
    nextButton2.addEventListener('click',  () => next(nextButton2))
    submitButton.addEventListener('click', handleSubmit)

    stepsContainer.addEventListener('input', handleChange)


}


export default formFunc;