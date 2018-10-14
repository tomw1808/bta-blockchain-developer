var NotaryArtifact = artifacts.require("./Notary.sol");

contract("NotaryContract", function(accounts) {
  it('This is my TestCase', function() {
    return NotaryArtifact.deployed().then(function(instance) {
      //here we can access instance
      //console.log(instance);
    })
  });

  it('should not have an Entry for a test-Hash', async function() {
    return NotaryArtifact.deployed().then(async function(instance) {
      try {
        await instance.entrySet(0x193C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD295);
        assert.fail(true, true, "Expected an Exception, but it just went through. Check entrySet!");
      } catch (error) {
        //test error message
        if (error.message.search("revert") >= 0) {
          assert.equal(error.message.search("revert") >= 0, true, "Error Message does not reflect expected Exception Message.");
        } else {
          throw error;
        }
      }
    });
  });


  it('should be able to add and then read an entry', async () => {
    let instance = await NotaryArtifact.deployed();
    await instance.addEntry(0x193C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD295, "test", "test");
    let entry = await instance.entrySet(0x193C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD295);
    assert.equal(entry[0], "test", "Filename should be test");
    assert.equal(entry[1].toNumber() >= 1, true, "Timestamp should be bigger than 1");
    assert.equal(entry[2], "test", "Comment should be test");
    assert.equal(entry[3], accounts[0], "Sending Transaction should be from Account 0");
  });

  it('should be not be possible to add two hashes', async () => {
    let instance = await NotaryArtifact.deployed();
    await instance.addEntry(0x293C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD295, "test", "test");
    try {
      await instance.addEntry(0x293C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD295, "test", "test");
      assert.fail(true, true, "Expected an Exception, but it just went through. Check entrySet!");
    } catch (error) {
      //test error message
      if (error.message.search("revert") >= 0) {
        assert.equal(error.message.search("revert") >= 0, true, "Error Message does not reflect expected Exception Message.");
      } else {
        throw error;
      }
    }
  });

});
