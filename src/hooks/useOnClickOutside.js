import {useEffect}from 'react'

export const useOnClickOutside = (ref,handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) { // ref.current.contains(event.target) : 모달 안쪽을 클릭하고잇으면
                console.log('ref',ref.current);// 안쪽을 클릭했을때 ref.current가 콘솔로그에 뜬다.
                return; 
            }
            handler(event); //핸들러는 setModalOpen(false)를 호출하는 것이다.
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
    
      return () => { //컴포넌트가 없어지면 리스너도 없애줘야하니까
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      }
    }, [ref, handler])
    

 
}
export default useOnClickOutside;