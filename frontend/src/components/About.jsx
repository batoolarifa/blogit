const About = ({about }) => {
    return (
      <div className="bg-[#bae15a] p-8 lg:ml-5 rounded-2xl shadow-lg max-w-3xl w-full text-center  mt-10" >
        <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
        <p className="mt-4 text-gray-900">
                { about}
          
        </p>
      </div>
    );
  };
  
  export default About;
  