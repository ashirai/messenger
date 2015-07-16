using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Messenger.Communication.Start))]
namespace Messenger.Communication
{
    public class Start
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}