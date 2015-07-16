using System.Web.Compilation;
using Microsoft.AspNet.SignalR;

namespace Messenger.Communication
{
    public class MessageHub : Hub
    {
        public void SendMessage(string userImage, string message)
        {
            Clients.All.sendMessage(userImage, message);
        }
    }
}