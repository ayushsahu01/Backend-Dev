module.exports = (req,res,next)=>{
  const start = Date.now();

  res.on("finish",()=>{
    const time = Date.now() - start;
    console.log(`${req.method} ${req.url} → ${time}ms`);
  });

  next();
};
